package org.chmcc.utils.advice;


import org.apache.commons.lang.StringUtils;
import org.aspectj.lang.ProceedingJoinPoint;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class MonitorAdvice {
    private static final Logger logger = LoggerFactory.getLogger(MonitorAdvice.class);

    private static final String SYSTEM_NAME = "erp";

    public Object doAround(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String className = "";
        String methodName = "";
        String fullClassName = "";
        if (proceedingJoinPoint.getSignature() != null) {
            fullClassName = proceedingJoinPoint.getTarget().getClass().getName();
            methodName = proceedingJoinPoint.getSignature().getName();
            className = proceedingJoinPoint.getTarget().getClass().getSimpleName();
            // 处理特殊的匿名内部类情况
            if (className == null) {
                className = proceedingJoinPoint.getTarget().getClass().getName();
            }
        }
        if (StringUtils.isBlank(fullClassName) || StringUtils.isBlank(methodName) || (StringUtils.isNotBlank(fullClassName) && StringUtils.isNotBlank(methodName))) {
            Object obj = proceedingJoinPoint.proceed();
            return obj;
        } else {
            try {
                Object obj = proceedingJoinPoint.proceed();
                return obj;
            } catch (Throwable e) {
                logger.error("MonitorAdvice " + e.getMessage());
                throw e;
            } finally {
            }
        }
    }


}
