import jwt
from datetime import datetime, timezone


def set_session_expiration_from_api_token(details, backend, response, request, user=None, *args, **kwargs):  # noqa
    print("set session exp")
    if not user:
        return
    api_tokens = request.session.get('api_tokens')
    if not api_tokens:
        return

    # Find the closest API token expiry time
    min_exp = None
    for token in api_tokens.values():
        try:
            claims = jwt.decode(token, verify=False)
        except Exception:
            continue

        exp = claims.get('exp')
        if not exp:
            continue

        try:
            dt = datetime.utcfromtimestamp(exp)
        except Exception:
            continue
        if min_exp is None or dt < min_exp:
            min_exp = dt

    if not min_exp:
        return
    min_exp = min_exp.replace(tzinfo=timezone.utc)

    request.session.set_expiry(min_exp)
