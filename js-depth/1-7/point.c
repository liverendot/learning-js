#include <stdio.h>
#include <stdlib.h>

typedef struct Object_tag
{
    char * name;
} Object;

void setName_value(char * name)
{
    printf("1. int setName name is : %p\n",name);
    name = "Nicholas";
    printf("2. int setName name is : %p\n",name);
}

void setName(Object * object)
{
    printf("    in setName object at %p\n",(&object));
    printf("    in setName value of object %p\n",object);
    object->name = "Nicholas"; //(*object).name

    object = (Object *)malloc(sizeof(Object));
    (*object).name = "Greg";
}

void setName_refrence(Object ** object)
{
    printf("    in setName_refrence object at %p\n",object);
    printf("    in setName_refrence value of object %p\n",*object);

    (*object) = (Object *)malloc(sizeof(Object));
    (*(*object)).name = "Greg";
}

int main(void)
{
    char * p = "aaaa";
    setName_value(p);
    printf("p is : %p,%s\n",p,p);

    Object * obj = (Object *)malloc(sizeof(Object));
    (*obj).name = "aaaa";
    printf("1. value of obj is %p , obj.name is %s\n",obj,(*obj).name);

    //setName()
    printf("\n");
    setName(obj);
    printf("2. value of obj is %p , obj.name is %s\n",obj,(*obj).name);

    //setName_refrence()
    printf("\n");
    setName_refrence(&obj);
    printf("3. value of obj is %p , obj.name is %s\n",obj,(*obj).name);
}