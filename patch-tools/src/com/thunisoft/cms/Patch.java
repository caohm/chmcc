package com.thunisoft.cms;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.FileFilter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author caohm
 * @version 1.0
 * @created 2016-1-26 上午10:08:16
 */
public class Patch {
    protected final Logger logger = LoggerFactory.getLogger(Patch.class);
    private List<String> _destUpdateFile = new ArrayList<>();
    private List<String> _excludeFile = new ArrayList<>();
    private String _projectName = "";
    private String _packageName = "";
    private String _oldPackageName = "";
    private String _inputPath = "";
    private String _outputPath = "";
    private boolean isClasses = false;
    private int finalDealWithFileCount = 0;


    /**
     * constructor
     *
     * @param projectName
     * @param packageName
     * @param updateFile
     * @param excludeFile
     * @param inputPath
     * @param outputPath
     * @param isClasses
     */
    public Patch(String projectName, String packageName, String oldPackageName, String updateFile, String excludeFile, String inputPath, String outputPath, boolean isClasses) {
        this._projectName = projectName;
        this._packageName = packageName;
        this._oldPackageName = oldPackageName;
        this._inputPath = inputPath;
        this._outputPath = outputPath;
        this.isClasses = isClasses;
        init(updateFile, excludeFile);
    }

    /**
     * init
     *
     * @param updateDirectory
     * @param excludeDirectory
     */
    private void init(String updateDirectory, String excludeDirectory) {
        // updateFile
        try {
            this._destUpdateFile = loadConfigFile(updateDirectory);
        } catch (IOException e) {

        }
        // excludeFile
        try {
            this._excludeFile = loadConfigFile(excludeDirectory);
        } catch (IOException e) {

        }
        //
    }

    /**
     * 加载配置文件（目录）
     *
     * @param directory
     * @return
     * @throws IOException
     */
    private List<String> loadConfigFile(String directory) throws IOException {
        List<File> list = Util.getFilesListWithOutDot(directory);
        List _destUpdateFile = new ArrayList();
        for (File localFile : list) {
            _destUpdateFile.addAll(readConfigFile(localFile));
        }
        return _destUpdateFile;
    }

    /**
     * start
     *
     * @throws Exception
     */
    public void start() throws Exception {
        if (CollectionUtils.isEmpty(this._destUpdateFile)) {
            logger.info("没有需要更新的文件");
            return;
        }
        for (String str1 : _destUpdateFile) {
            try {
                String str2 = str1.replace("\\", "/");
                if (_excludeFile.contains(str1)) {
                    logger.info("ignore file : " + str1);
                    continue;
                }
                if (isClasses) {
                    if (str2.startsWith(Constent.web)) {
                        str2 = _projectName + StringUtils.substringAfter(str2, Constent.web);
                    }
                    if (str2.startsWith(Constent.PATH_destclass)) {
                        str2 = _projectName + "/WEB-INF/classes/" + StringUtils.substringAfter(str2, Constent.PATH_destclass);
                    }
                } else {
                    if (str2.startsWith(Constent.src)) {
                        str2 = _projectName + "/" + str2;
                    } else {
                        str2 = _projectName + "/" + str2;
                    }
                }
                dealWithFileCopy(_inputPath + str1, _outputPath + str2);
            } catch (Exception localException) {
                logger.error(str1 + " (系统找不到指定的文件。) ");
            }
        }
        logger.info("本次一共成功更新文件数 " + finalDealWithFileCount + " 个 ");
        logger.info("更新完毕！");
    }

    /**
     * 解析配置文件
     *
     * @param file
     * @return
     * @throws IOException
     */
    private List<String> readConfigFile(File file) throws IOException {
        List<File> list = new ArrayList<>();
        List<String> lines = Util.readFile(file);
        for (String line : lines) {
            if (StringUtils.isBlank(line) || line.startsWith("#")) {
                continue;
            }
            if (line.startsWith(Constent.web)) {
                if (line.endsWith(Constent.All)) {
                    File localFile = new File(_inputPath + line.replace(Constent.All, ""));
                    list.addAll(getAllFiles(localFile));
                    continue;
                }
                list.add(new File(_inputPath + line));
            }
            if (line.startsWith(Constent.src)) {
                if (isClasses) {
                    line = line.replace(Constent.TYPE_dotjava, Constent.TYPE_dotclass);
                    line = Constent.PATH_destclass + line.replace(Constent.srcSepater, "");
                    if (line.endsWith(Constent.All)) {
                        File localFile = new File(_inputPath + line.replace(Constent.All, ""));
                        list.addAll(getAllFiles(localFile));
                        continue;
                    }
                    final String filename = StringUtils.substringBeforeLast(StringUtils.substringAfterLast(line, "/"), ".");
                    if (filename.contains("$")) {
                        FileFilter fileFilter = new FileFilter() {
                            @Override
                            public boolean accept(File file) {
                                return file.getName().contains("$") && file.getName().startsWith(filename);
                            }
                        };
                        File[] lis = new File(Constent.PATH_destclass + StringUtils.substringBeforeLast(line, "/")).listFiles(fileFilter);
                        if (null != lis) {
                            list.addAll(Arrays.asList(lis));
                        }
                    }
                    list.add(new File(_inputPath + line));
                } else {
                    line = Constent.srcSepater + line.replace(Constent.srcSepater, "");
                    if (line.endsWith(Constent.All)) {
                        File localFile = new File(_inputPath + line.replace(Constent.All, ""));
                        list.addAll(getAllFiles(localFile));
                        continue;
                    }
                    list.add(new File(_inputPath + line));
                }
            }

        }
        List<String> nameList = new ArrayList();
        for (File tmp : list) {
            nameList.add(tmp.getAbsolutePath().replace(_inputPath, ""));
        }
        logger.info(file.getName() + " 需要更新文件数 " + list.size() + " 个");
        return nameList;
    }

    private List<File> getAllFiles(File file) {
        List<File> list = new ArrayList();
        if (!file.exists()) {
            return list;
        }
        if (file.isFile()) {
            list.add(file);
        }
        List<File> list1 = Util.getFilesListWithOutDot(file);
        for (File file1 : list1) {
            if (file1.isDirectory()) {
                list.addAll(getAllFiles(file1));
            }
            if (file1.isFile()) {
                list.add(file1);
            }
        }
        return list;
    }


    private void dealWithFileCopy(String srcFilePath, String destFilePath) throws Exception {
        try {
            File srcFile = new File(srcFilePath);
            File destFile;
            if (isClasses) {
                destFile = new File(destFilePath);
                Util.createFileWithCreateLoopDir(destFile);
                FileUtils.copyFile(srcFile, destFile);
            } else {
                if (srcFile.getName().endsWith(Constent.TYPE_dotjava)) {
                    destFile = new File(destFilePath.replace(_oldPackageName.replace(".", "/"), _packageName.replace(".", "/")));
                    Util.createFileWithCreateLoopDir(destFile);
                    List<String> list = Util.readFile(srcFile);
                    for (int i = 0; i < list.size(); i++) {
                        String line = list.get(i);
                        if (StringUtils.isBlank(line)) {
                            continue;
                        }
                        if (line.startsWith("import ") || line.startsWith("package ")) {
                            list.remove(i);
                            list.add(i, line.replace(_oldPackageName, _packageName));
                        }
                    }
                    FileUtils.writeLines(destFile, list);
                } else {
                    destFile = new File(destFilePath);
                    Util.createFileWithCreateLoopDir(destFile);
                    FileUtils.copyFile(srcFile, destFile);
                }
            }
            finalDealWithFileCount += 1;
            logger.info("copy file :" + destFilePath);
        } catch (Exception e) {
            logger.error("", e);
        }
    }

    public int getUpdateFileCount() {
        return this.finalDealWithFileCount;
    }
}