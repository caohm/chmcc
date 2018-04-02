package com.thunisoft.cms;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.lang.StringUtils;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;


public class Util {
    /**
     * 获得父目录路径（结尾带"/"）
     *
     * @param patch
     * @return
     */
    public static String getParentPathWithSepartor(String patch) {
        if (StringUtils.isBlank(patch)) {
            return "";
        }
        if (patch.contains("/")) {
            return patch;
        }
        return patch + File.separator;
    }

    /**
     * 获得父目录路径（结尾带"/"）
     *
     * @param file
     * @return
     */
    public static String getParentPathWithSepartor(File file) {
        if (file.exists()) {
            return "";
        }
        if (file.isDirectory()) {
            return getParentPathWithSepartor(file.getAbsolutePath());
        }
        if (file.isFile()) {
            return getParentPathWithSepartor(file.getParentFile().getAbsolutePath());
        }
        return "";
    }

    /**
     * 生成唯一文件名（"_yyyyMMddHHmmss"）
     *
     * @param patch
     * @return 唯一文件名
     */
    public static String GenerateUniqueFileName(String patch) {
        if (StringUtils.isBlank(patch)) {
            return "";
        }
        if (!patch.contains(".")) {
            return "";
        }
        String name = StringUtils.substringAfterLast(patch, ".");
        String type = StringUtils.substringBeforeLast(patch, ".");
        StringBuffer sb = new StringBuffer();
        sb.append(GenerateUniqueName(name)).append(".").append(type);
        return sb.toString();
    }

    /**
     * 生成唯一名（"_yyyyMMddHHmmss"）
     *
     * @param str
     * @return
     */
    public static String GenerateUniqueName(String str) {
        StringBuffer sb = new StringBuffer(str);
        return GenerateUniqueName(sb);
    }

    /**
     * 生成唯一名（"_yyyyMMddHHmmss"）
     *
     * @param str
     * @return
     */
    public static String GenerateUniqueName(StringBuffer str) {
        if (null == str) {
            return "";
        }
        if (StringUtils.isBlank(str.toString())) {
            return "";
        }
        str.append("_").append(new SimpleDateFormat("yyyyMMddHHmmss").format(new Date()));
        return str.toString();
    }

    /**
     * 读取文件为List<String>
     *
     * @param path String
     * @return
     * @throws IOException
     */
    public static List<String> readFile(String path) throws IOException {
        List list = new ArrayList();
        if (StringUtils.isBlank(path)) {
            return list;
        }
        File file = new File(path);
        if (!file.exists()) {
            return list;
        }
        return readFile(file);
    }

    /**
     * 读取文件为List<String>
     *
     * @param file File
     * @return
     * @throws IOException
     */
    public static List<String> readFile(File file) throws IOException {
        List list = new ArrayList();

        if (!file.exists()) {
            return list;
        }
        list = FileUtils.readLines(file);
        return list;
    }

    /**
     * 创建文件并且循环创建父目录
     * Create the given file. If the parent directory  don't exists, we will create them all.
     *
     * @param filepath the file to be created
     * @return true if the named file does not exist and was successfully created; false if the named file already exists
     * @throws IOException
     * @see java.io.File#createNewFile
     */
    public static boolean createFileWithCreateLoopDir(String filepath) throws IOException {
        File file = new File(filepath);
        return createFileWithCreateLoopDir(file);
    }

    /**
     * 创建文件并且循环创建父目录
     * Create the given file. If the parent directory  don't exists, we will create them all.
     *
     * @param file the file to be created
     * @return true if the named file does not exist and was successfully created; false if the named file already exists
     * @throws IOException
     * @see java.io.File#createNewFile
     */
    public static boolean createFileWithCreateLoopDir(File file) throws IOException {
        if (!file.exists()) {
            if (!file.getParentFile().exists()) {
                makeDirLoop(file.getParentFile());
            }
        }
        return file.createNewFile();
    }

    /**
     * 循环创建目录
     * Create the given directory . If the parent folders don't exists, we will create them all.
     *
     * @param dir the directory to be created
     * @see java.io.File#mkdir()
     */
    public static void makeDirLoop(File dir) throws IOException {
        if (!dir.getParentFile().exists()) {
            makeDirLoop(dir.getParentFile());
        }
        FileUtils.forceMkdir(dir);
    }

    /**
     * 获得文件list(不包括"."开头的)
     *
     * @param filepath
     * @return
     */
    public static List<File> getFilesListWithOutDot(String filepath) {
        List list = new ArrayList();
        if (StringUtils.isNotBlank(filepath)) {
            list = getFilesListWithOutDot(new File(filepath));
        }
        return list;
    }

    /**
     * 获得文件list(不包括"."开头的)
     *
     * @param file
     * @return
     */
    public static List<File> getFilesListWithOutDot(File file) {
        List list = new ArrayList();
        File[] files = file.listFiles(filefilterWithoutDot());
        if (ArrayUtils.isNotEmpty(files)) {
            list = Arrays.asList(files);
        }
        return list;
    }

    /**
     * FileFilter(不包括"."开头的)
     *
     * @return
     */
    public static FileFilter filefilterWithoutDot() {
        FileFilter filefilter = new FileFilter() {
            @Override
            public boolean accept(File file) {
                return !file.getName().startsWith(".");
            }
        };
        return filefilter;
    }
}
