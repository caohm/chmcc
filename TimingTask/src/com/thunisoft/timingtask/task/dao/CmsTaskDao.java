package com.thunisoft.timingtask.task.dao;


import com.thunisoft.timingtask.common.page.Pagination;
import com.thunisoft.timingtask.task.model.CmsTask;

import java.util.List;

public interface CmsTaskDao {
    public Pagination getPage(Integer siteId, int pageNo, int pageSize);

    public List<CmsTask> getList();

    public CmsTask findById(Integer id);

    public CmsTask save(CmsTask bean);


    public CmsTask deleteById(Integer id);
}