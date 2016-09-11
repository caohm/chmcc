package org.hmcc.timingtask.plugin.dao;


import org.hmcc.timingtask.common.page.Pagination;
import org.hmcc.timingtask.plugin.model.CmsPlug;

import java.util.List;

public interface CmsPlugDao {
    public Pagination getPage(int pageNo, int pageSize);

    public List<CmsPlug> getList(String author, Boolean used);

    public CmsPlug findById(Integer id);

    public CmsPlug findByPath(String plugPath);

    public CmsPlug save(CmsPlug bean);

//	public CmsPlug updateByUpdater(Updater<CmsPlug> updater);

    public CmsPlug deleteById(Integer id);
}