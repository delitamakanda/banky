import json
from pathlib import Path

from django import template
from django.conf import settings
from django.utils.safestring import mark_safe

register = template.Library()


def load_json_from_dist(json_filename='manifest.json'):
    manifest_file_path = Path(str(settings.VITE_APP_DIR), 'dist', json_filename)
    if not manifest_file_path.exists():
        raise OSError(
            f'Vite manifest file not found on path: {str(manifest_file_path)}'
        )
    with open(manifest_file_path, 'r') as manifest_file:
        try:
            manifest = json.load(manifest_file)
        except json.JSONDecodeError as e:
            raise json.JSONDecodeError(
                f'Vite manifest file invalid. Maybe your {str(manifest_file_path)} file is empty?'
            ) from e
        else:
            return manifest


@register.simple_tag
def render_vite_bundle():
    """
    Template tag to render a vite bundle.
    Supposed to only be used in production.
    For development, see other files.
    """

    manifest = load_json_from_dist()
    print(manifest)

    imports_files = "".join(
        [
            f'<script type="module" src="/static/{manifest["index.html"]["file"]}"></script>'
            # for file in manifest["index.html"]["imports"]
        ]
    )

    return mark_safe(
        f"""<script type="module" src="/static/{manifest['index.html']['file']}"></script>
        <link rel="stylesheet" type="text/css" href="/static/{manifest['index.html']['css'][0]}" />
        {imports_files}"""
    )