package org.hmcc.timingtask.task.dao;


import org.hmcc.timingtask.common.page.Pagination;
import org.hmcc.timingtask.task.model.CmsTask;

import java.util.List;

public interface CmsTaskDao {
    public Pagination getPage(Integer siteId, int pageNo, int pageSize);

    public List<CmsTask> getList();

    public CmsTask findById(Integer id);

    public CmsTask save(CmsTask bean);


    public CmsTask deleteById(Integer id);
}