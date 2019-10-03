# =============================================================================================
FROM helsinkitest/python-node:3.6-8-slim as appbase
# =============================================================================================

WORKDIR /app/

COPY requirements.txt /app/requirements.txt
COPY requirements-prod.txt /app/requirements-prod.txt
COPY yarn.lock /app/yarn.lock
COPY package.json /app/package.json

RUN apt-get update \
  && apt-get install --no-install-recommends -y  \
    gettext \
    build-essential \
    gdal-bin \
    libpq-dev \
    netcat \
  && pip install --no-cache-dir -r /app/requirements.txt \
  && pip install --no-cache-dir -r /app/requirements-prod.txt \
  && yarn \
  && yarn cache clean \
  && apt-get remove -y build-essential \
  && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /var/cache/apt/archives

RUN mkdir -p /app/tmp

COPY --chown=appuser:appuser docker-entrypoint.sh /app/docker-entrypoint.sh

ENTRYPOINT ["./docker-entrypoint.sh"]

# =========================
FROM appbase as development
# =========================

COPY --chown=appuser:appuser requirements-dev.txt /app/requirements-dev.txt
RUN pip install --no-cache-dir  -r /app/requirements-dev.txt

ENV DEV_SERVER=1

USER appuser

EXPOSE 8001/tcp

# ==========================
FROM appbase as production
# ==========================

COPY --chown=appuser:appuser . /app/

RUN yarn build

USER appuser

EXPOSE 8001/tcp
