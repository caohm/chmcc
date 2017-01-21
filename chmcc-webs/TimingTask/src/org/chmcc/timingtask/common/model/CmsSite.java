package org.chmcc.timingtask.common.model;


import org.chmcc.timingtask.common.model.abstrct.BaseCmsSite;

public class CmsSite extends BaseCmsSite {
    public static final String PV_TOTAL = "pvTotal";
    public static final String VISITORS = "visitors";
    private static final long serialVersionUID = 1L;


    /* [CONSTRUCTOR MARKER BEGIN] */
    public CmsSite() {
        super();
    }

    /**
     * Constructor for primary key
     */
    public CmsSite(Integer id) {
        super(id);
    }

    /**
     * Constructor for required fields
     */
    public CmsSite(
            Integer id,
            String domain,
            String path,
            String name,
            String protocol,
            String dynamicSuffix,
            String staticSuffix,
            Boolean indexToRoot,
            Boolean staticIndex,
            String localeAdmin,
            String localeFront,
            String tplSolution,
            Byte finalStep,
            Byte afterCheck,
            Boolean relativePath,
            Boolean resycleOn) {

        super(
                id,
                domain,
                path,
                name,
                protocol,
                dynamicSuffix,
                staticSuffix,
                indexToRoot,
                staticIndex,
                localeAdmin,
                localeFront,
                tplSolution,
                finalStep,
                afterCheck,
                relativePath,
                resycleOn);
    }

	/* [CONSTRUCTOR MARKER END] */

}