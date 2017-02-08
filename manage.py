#!/usr/bin/env python
import os
import sys

base_path = os.path.abspath(os.path.dirname(__file__))
activate_this = os.path.join(base_path, 'env', 'bin', 'activate_this.py')
exec(compile(open(activate_this).read(), activate_this, 'exec'),
     dict(__file__=activate_this))

if __name__ == '__main__':
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'goabase.conf.settings.local')
    from django.core.management import execute_from_command_line
    execute_from_command_line(sys.argv)
