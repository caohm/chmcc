package org.chmcc.springmvc.aop;

import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Created by caohongming on 2016/12/29.
 */
public class AdviceUtils {
    private static final Logger logger = LoggerFactory.getLogger(AdviceUtils.class);

    public Object doActionAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        GetName getName = new GetName(proceedingJoinPoint).invoke();
        String className = getName.getClassName();
        String methodName = getName.getMethodName();
        try {
            logger.error("doActionAround");
            logger.error("in " + className + "." + methodName);
            Object obj = proceedingJoinPoint.proceed();
            logger.error("out " + className + "." + methodName);
            return obj;
        } catch (Throwable e) {
            throw e;
        } finally {
        }
    }

    public Object doInterfaceAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        GetName getName = new GetName(proceedingJoinPoint).invoke();
        String className = getName.getClassName();
        String methodName = getName.getMethodName();
        try {
            logger.error("doInterfaceAround");
            logger.error("in " + className + "." + methodName);
            Object obj = proceedingJoinPoint.proceed();
            logger.error("out " + className + "." + methodName);
            return obj;
        } catch (Throwable e) {
            throw e;
        } finally {
        }
    }

    public Object doServiceAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        GetName getName = new GetName(proceedingJoinPoint).invoke();
        String className = getName.getClassName();
        String methodName = getName.getMethodName();
        try {
            logger.error("doServiceAround");
            logger.error("in " + className + "." + methodName);
            Object obj = proceedingJoinPoint.proceed();
            logger.error("out " + className + "." + methodName);
            return obj;
        } catch (Throwable e) {
            throw e;
        } finally {
        }
    }

    public Object doDaoAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        GetName getName = new GetName(proceedingJoinPoint).invoke();
        String className = getName.getClassName();
        String methodName = getName.getMethodName();
        try {
            logger.error("doDaoAround");
            logger.error("in " + className + "." + methodName);
            Object obj = proceedingJoinPoint.proceed();
            logger.error("out " + className + "." + methodName);
            return obj;
        } catch (Throwable e) {
            throw e;
        } finally {
        }
    }

    private class GetName {
        private ProceedingJoinPoint proceedingJoinPoint;
        private String className;
        private String methodName;

        public GetName(ProceedingJoinPoint proceedingJoinPoint) {
            this.proceedingJoinPoint = proceedingJoinPoint;
        }

        public String getClassName() {
            return className;
        }

        public String getMethodName() {
            return methodName;
        }

        public GetName invoke() {
            className = "";
            methodName = "";
            if (proceedingJoinPoint.getSignature() != null) {
                methodName = proceedingJoinPoint.getSignature().getName();
                className = proceedingJoinPoint.getTarget().getClass().getSimpleName();
                // 处理特殊的匿名内部类情况
                if (className == null) {
                    className = proceedingJoinPoint.getTarget().getClass().getName();
                }
            }
            return this;
        }
    }
}
