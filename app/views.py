from django.shortcuts import render

def home(request):
    return render(request, 'myapp/index.html')  # Updated path

def courses(request):
    return render(request, 'myapp/courses.html')  # Updated path
