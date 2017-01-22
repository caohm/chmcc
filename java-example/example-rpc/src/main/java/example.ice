module org {
    module chmcc {
        module helloworld {
            module rpc {
                module example {
                    struct ExampleBean {
                        string name;
                        int type;
                    };

                    interface ExampleService {
                        ExampleBean addExample(ExampleBean e);
                    };
                };
            };
        };
    };
};