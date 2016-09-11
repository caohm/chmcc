package org.hmcc.timingtask.plugin.dao.impl;

import org.hmcc.timingtask.common.page.Pagination;
import org.hmcc.timingtask.plugin.dao.CmsPlugDao;
import org.hmcc.timingtask.plugin.model.CmsPlug;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class CmsPlugDaoImpl implements CmsPlugDao {

    @Override
    public Pagination getPage(int pageNo, int pageSize) {
        return null;
    }

    @Override
    public List<CmsPlug> getList(String author, Boolean used) {
        return null;
    }

    @Override
    public CmsPlug findById(Integer id) {
        return null;
    }

    @Override
    public CmsPlug findByPath(String plugPath) {
        return null;
    }

    @Override
    public CmsPlug save(CmsPlug bean) {
        return null;
    }

    @Override
    public CmsPlug deleteById(Integer id) {
        return null;
    }
}