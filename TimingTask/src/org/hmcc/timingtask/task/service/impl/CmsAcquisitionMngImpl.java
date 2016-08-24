package org.hmcc.timingtask.task.service.impl;

import org.hmcc.timingtask.common.model.Content;
import org.hmcc.timingtask.task.model.CmsAcquisition;
import org.hmcc.timingtask.task.model.CmsAcquisitionHistory;
import org.hmcc.timingtask.task.model.CmsAcquisitionTemp;
import org.hmcc.timingtask.task.service.CmsAcquisitionMng;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class CmsAcquisitionMngImpl implements CmsAcquisitionMng {

    @Override
    public List<CmsAcquisition> getList(Integer siteId) {
        return null;
    }

    @Override
    public CmsAcquisition findById(Integer id) {
        return null;
    }

    @Override
    public void stop(Integer id) {

    }

    @Override
    public void pause(Integer id) {

    }

    @Override
    public CmsAcquisition start(Integer id) {
        return null;
    }

    @Override
    public void end(Integer id) {

    }

    @Override
    public boolean isNeedBreak(Integer id, int currNum, int currItem, int totalItem) {
        return false;
    }

    @Override
    public CmsAcquisition save(CmsAcquisition bean, Integer channelId, Integer typeId, Integer userId, Integer siteId) {
        return null;
    }

    @Override
    public CmsAcquisition update(CmsAcquisition bean, Integer channelId, Integer typeId) {
        return null;
    }

    @Override
    public CmsAcquisition deleteById(Integer id) {
        return null;
    }

    @Override
    public CmsAcquisition[] deleteByIds(Integer[] ids) {
        return new CmsAcquisition[0];
    }

    @Override
    public Content saveContent(String title, String txt, String origin, String author, String description, Date releaseDate, Integer acquId, CmsAcquisition.AcquisitionResultType resultType, CmsAcquisitionTemp temp, CmsAcquisitionHistory history) {
        return null;
    }

    @Override
    public CmsAcquisition getStarted(Integer siteId) {
        return null;
    }

    @Override
    public Integer getMaxQueue(Integer siteId) {
        return null;
    }

    @Override
    public Integer hasStarted(Integer siteId) {
        return null;
    }

    @Override
    public void addToQueue(Integer[] ids, Integer queueNum) {

    }

    @Override
    public void cancel(Integer siteId, Integer id) {

    }

    @Override
    public List<CmsAcquisition> getLargerQueues(Integer siteId, Integer queueNum) {
        return null;
    }

    @Override
    public CmsAcquisition popAcquFromQueue(Integer siteId) {
        return null;
    }
}