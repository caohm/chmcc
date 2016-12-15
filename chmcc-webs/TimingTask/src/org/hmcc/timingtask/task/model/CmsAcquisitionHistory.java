package org.hmcc.timingtask.task.model;

import org.hmcc.timingtask.task.model.abstrct.BaseCmsAcquisitionHistory;

public class CmsAcquisitionHistory extends BaseCmsAcquisitionHistory {
    private static final long serialVersionUID = 1L;

    /*[CONSTRUCTOR MARKER BEGIN]*/
    public CmsAcquisitionHistory() {
        super();
    }

    /**
     * Constructor for primary key
     */
    public CmsAcquisitionHistory(Integer id) {
        super(id);
    }

    /**
     * Constructor for required fields
     */
    public CmsAcquisitionHistory(
            Integer id,
            String channelUrl,
            String contentUrl) {

        super(
                id,
                channelUrl,
                contentUrl);
    }

/*[CONSTRUCTOR MARKER END]*/


}