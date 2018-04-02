package org.chmcc.mock.mockloader.test.vo;

/**
 * Created by david on 2015/7/12.
 */
public class User {

    private Integer id;
    private String name;
    private Integer age;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }


    public String toString(){
        return "{id="+id+","+ ",name="+name+",age="+age+"}";
    }


}
