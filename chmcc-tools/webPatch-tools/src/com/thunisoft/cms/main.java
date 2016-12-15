package com.thunisoft.cms;

import gnu.getopt.Getopt;
import org.apache.commons.collections.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;

/**
 * @author caohm
 * @version 1.0
 * @created 2016-1-26 上午10:08:16
 */
public class main {

    protected static final Logger logger = LoggerFactory.getLogger(main.class);
    private static String _updateFile = "patch/List_update/";
    private static String _excludeFile = "patch/List_exclude/";
    private static String _projectName = "project";
    private static String _packageName = "com.thunisoft.TimingTask.plugin";
    private static String _oldPackageName = "com.jeecms";
    private static String _inputPath = "";
    private static String _outputPath = "patch/output/";
    private static boolean isClasses = false;


    /**
     * 使用说明
     */
    private static void usage() {
        try {
            systemOutInfo("help/cmd.txt");
        } catch (IOException e) {
            logger.error("读取help.txt异常", e);

        }
    }

    /**
     * 版本信息
     */
    private static void version() {
        try {
            systemOutInfo("help/version.txt");
        } catch (IOException e) {
            logger.error("读取version.txt异常", e);
        } finally {
        }
    }

    /**
     * 参数分析
     *
     * @param args
     * @return
     */
    private static boolean analyzeParams(String[] args) {
        logger.info("参数分析...");

        Getopt g = new Getopt("Patch", args, "p:P:u:i:e:o:h:vV");
        int c;
        while ((c = g.getopt()) != -1) {
            switch (c) {
                case 'P':
                    _projectName = Util.GenerateUniqueFileName(g.getOptarg());
                    break;
                case 'p':
                    _packageName = g.getOptarg();
                    break;
                case 'u':
                    _updateFile = g.getOptarg();
                    break;
                case 'e':
                    _excludeFile = g.getOptarg();
                    break;
                case 'i':
                    _inputPath = Util.getParentPathWithSepartor(g.getOptarg());
                    break;
                case 'o':
                    _outputPath = Util.getParentPathWithSepartor(g.getOptarg());
                    break;
                case 'v':
                case 'V':
                    version();
                    return false;
                default:
                    usage();
                    return false;
            }
        }
        logger.info("参数分析完成.");
        return true;
    }

    /**
     * 输出信息
     *
     * @param path
     * @throws IOException
     */
    private static void systemOutInfo(String path) throws IOException {
        List<String> list = Util.readFile(path);
        if (CollectionUtils.isEmpty(list)) {
            return;
        }
        for (String line : list) {
            logger.info(line);
        }
    }

    /**
     * @param args
     * @throws Exception
     */
    public static void main(String[] args) throws Exception {
        // 初始化参数
        if (!analyzeParams(args)) {
            return;
        }
        Patch path = new Patch(_projectName, _packageName, _oldPackageName, _updateFile, _excludeFile, _inputPath, _outputPath, isClasses);
        path.start();
    }


}