def pages(request):
    return {'menu_pages': request.site.root_page.get_children().live().in_menu()}
