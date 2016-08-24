package org.hmcc.timingtask.task.model;

import org.hmcc.timingtask.common.model.CmsSite;
import org.hmcc.timingtask.common.model.CmsUser;
import org.hmcc.timingtask.task.model.abstrct.BaseCmsAcquisition;
import org.apache.commons.lang.StringUtils;

public class CmsAcquisition extends BaseCmsAcquisition {
    /**
     * 动态页翻页页号
     */
    public static final String PAGE = "[page]";
    /**
     * 停止状态
     */
    public static final int STOP = 0;
    /**
     * 采集状态
     */
    public static final int START = 1;
    /**
     * 暂停状态
     */
    public static final int PAUSE = 2;
    private static final long serialVersionUID = 1L;

    /* [CONSTRUCTOR MARKER BEGIN] */
    public CmsAcquisition() {
        super();
    }

    /**
     * Constructor for primary key
     */
    public CmsAcquisition(Integer id) {
        super(id);
    }

    /**
     * Constructor for required fields
     */
    public CmsAcquisition(
            Integer id,
            CmsUser user,
//            ContentType type,
            CmsSite site,
//            Channel channel,
            String name,
            Integer status,
            Integer currNum,
            Integer currItem,
            Integer totalItem,
            Integer pauseTime,
            String pageEncoding,
            Integer queue) {


    }

    /**
     * 是否停止
     *
     * @return
     */
    public boolean isStop() {
        int status = getStatus();
        return status == 0;
    }

    /**
     * 是否暂停
     *
     * @return
     */
    public boolean isPuase() {
        int status = getStatus();
        return status == 2;
    }

    /**
     * 是否中断。停止和暂停都需要中断。
     *
     * @return
     */
    public boolean isBreak() {
        int status = getStatus();
        return status == 0 || status == 2;
    }

    public String[] getPlans() {
        String plan = getPlanList();
        if (!StringUtils.isBlank(plan)) {
            return StringUtils.split(plan);
        } else {
            return new String[0];
        }
    }

    public String[] getAllPlans() {
        String[] plans = getPlans();
        Integer start = getDynamicStart();
        Integer end = getDynamicEnd();
        if (!StringUtils.isBlank(getDynamicAddr()) && start != null
                && end != null && start >= 0 && end >= start) {
            int plansLen = plans.length;
            String[] allPlans = new String[plansLen + end - start + 1];
            for (int i = 0; i < plansLen; i++) {
                allPlans[i] = plans[i];
            }
            for (int i = 0, len = end - start + 1; i < len; i++) {
                allPlans[plansLen + i] = getDynamicAddrByNum(start + i);
            }
            return allPlans;
        } else {
            return plans;
        }
    }

    public String getDynamicAddrByNum(int num) {
        return StringUtils.replace(getDynamicAddr(), PAGE, String.valueOf(num));
    }

    public int getTotalNum() {
        int count = 0;
        Integer start = getDynamicStart();
        Integer end = getDynamicEnd();
        if (!StringUtils.isBlank(getDynamicAddr()) && start != null
                && end != null) {
            count = end - start + 1;
        }
        if (!StringUtils.isBlank(getPlanList())) {
            count += getPlans().length;
        }
        return count;
    }

    public void init() {
        if (getStatus() == null) {
            setStatus(STOP);
        }
        if (getCurrNum() == null) {
            setCurrNum(0);
        }
        if (getCurrItem() == null) {
            setCurrItem(0);
        }
        if (getTotalItem() == null) {
            setTotalItem(0);
        }
        if (getPauseTime() == null) {
            setPauseTime(0);
        }
        if (getQueue() == null) {
            setQueue(0);
        }
    }

    public static enum AcquisitionResultType {
        SUCCESS, TITLESTARTNOTFOUND, TITLEENDNOTFOUND, CONTENTSTARTNOTFOUND, CONTENTENDNOTFOUND, VIEWSTARTNOTFOUND, VIEWENDNOTFOUND, AUTHORSTARTNOTFOUND, AUTHORENDNOTFOUND, ORIGINSTARTNOTFOUND, ORIGINENDNOTFOUND, DESCRISTARTNOTFOUND, DESCRIENDNOTFOUND, RELEASESTARTNOTFOUND, RELEASEENDNOTFOUND, VIEWIDSTARTNOTFOUND, VIEWIDENDNOTFOUND, TITLEEXIST, URLEXIST, UNKNOW
    }

    public static enum AcquisitionRepeatCheckType {
        NONE, TITLE, URL
    }

	/* [CONSTRUCTOR MARKER END] */

}