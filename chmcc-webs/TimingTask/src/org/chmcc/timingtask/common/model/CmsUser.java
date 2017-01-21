package org.chmcc.timingtask.common.model;


import org.chmcc.timingtask.common.model.abstrct.BaseCmsUser;

import java.util.Date;

public class CmsUser extends BaseCmsUser {
    private static final long serialVersionUID = 1L;


    /* [CONSTRUCTOR MARKER BEGIN] */
    public CmsUser() {
        super();
    }

    /**
     * Constructor for primary key
     */
    public CmsUser(Integer id) {
        super(id);
    }

    /**
     * Constructor for required fields
     */
    public CmsUser(Integer id,
                   String username, Date registerTime,
                   String registerIp, Integer loginCount,
                   Integer rank, Long uploadTotal,
                   Integer uploadSize, Boolean admin,
                   Boolean viewonlyAdmin, Boolean selfAdmin,
                   Boolean disabled) {

        super(id, username, registerTime, registerIp, loginCount, rank,
                uploadTotal, uploadSize, admin, viewonlyAdmin, selfAdmin,
                disabled);
    }

	/* [CONSTRUCTOR MARKER END] */

}