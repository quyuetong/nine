
# Create your views here.

from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from models import Task


@api_view(['POST'])
@permission_classes([])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user is not None:
        token = Token.objects.get(user=user)
        data = {"token": str(token), "lastname": user.last_name, "firstname": user.first_name}
        return Response({"result": True, "data": data})
    else:
        error_message = "The combination of username and password doesn't match any record."
        return Response({"result": False, "message": error_message}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@permission_classes([])
def register(request):
    username = request.data.get('username')
    password = request.data.get('password')
    first_name = request.data.get('firstname')
    last_name = request.data.get('lastname')
    if len(User.objects.filter(username=username)) == 0:
        user = User.objects.create(username=username, first_name=first_name, last_name=last_name)
        user.set_password(password)
        user.save()
        Token.objects.create(user=user)
        return Response({"result": True})
    else:
        message = "The username: {} already exists, please choice a different username.".format(username)
        return Response({"result": False, "message": message})


@api_view(['POST'])
def add_task(request):
    owner = request.user
    name = request.data.get('name')
    expire_date = request.data.get('expireDate')
    priority = request.data.get('priority')
    description = request.data.get('description')
    state = 0
    Task.objects.create(name=name,
                        expire_date=expire_date,
                        priority=priority,
                        description=description,
                        state=state,
                        owner=owner)
    return Response({"result": True})


@api_view(['POST'])
def get_tasks(request):
    owner = request.user
    tasks = Task.objects.filter(owner=owner)
    sort_by = request.data.get('sort_by')
    reverse = request.data.get('reverse')
    if len(sort_by) > 0:
        tasks = tasks.order_by(sort_by)
        if reverse:
            tasks = tasks[::-1]
    tasks_l = []
    for item in tasks:
        temp_d = dict()
        temp_d['id'] = item.id
        temp_d['name'] = item.name
        temp_d['priority'] = item.priority
        temp_d['expire_date'] = item.expire_date
        temp_d['state'] = item.state
        temp_d['description'] = item.description
        tasks_l.append(temp_d)
    return Response(tasks_l)


@api_view(['POST'])
def get_task(request):
    owner = request.user
    id = request.data.get('id')
    task = Task.objects.filter(id=id, owner=owner)[0]
    temp_d = dict()
    temp_d['id'] = task.id
    temp_d['name'] = task.name
    temp_d['priority'] = task.priority
    temp_d['expire_date'] = task.expire_date
    temp_d['state'] = task.state
    temp_d['description'] = task.description
    return Response(temp_d)


@api_view(['POST'])
def edit_task(request):
    owner = request.user
    id = request.data.get('id')
    task = Task.objects.filter(id=id, owner=owner)[0]
    if 'name' in request.data:
        task.name = request.data.get('name')
    if 'priority' in request.data:
        task.priority = request.data.get('priority')
    if 'expire_date' in request.data:
        task.expire_date = request.data.get('expire_date')
    if 'state' in request.data:
        task.state = request.data.get('state')
    if 'description' in request.data:
        task.description = request.data.get('description')
    task.save()
    return Response({"result": True})


@api_view(['POST'])
def delete_task(request):
    owner = request.user
    id = request.data.get('id')
    task = Task.objects.filter(id=id, owner=owner)[0]
    task.delete()
    return Response({"result": True})
