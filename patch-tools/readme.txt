WritConvert Usage:
    java -jar Patch.jar [OPTION]...

        -h 帮助说明
        -v 版本信息

 操作类型：
        -P        project     项目名
        -p        package    目标包名
        -i        inputPath   项目源路径
        -o        outputPath  目标路径                   默认：output
        -u        updateList  更新文件列表               默认：updateList
        -e        excludeFile 排除文件列表               默认：exclude.txt
eg:

-P hljgf
-p com.thunisoft.TimingTask.plugin
-u updateList
-i f:\svn\FY_HEILONGJIANG_NW_CMS\40_源码\高级人民法院内网\高级人民法院内网201808
-o output
