#!/usr/bin/env python
# -*- coding: cp936 -*-
import os
import re
import shutil
import time

base_dir = os.path.abspath(os.path.dirname(__file__))
date_ = time.strftime('%Y-%m-%d')


def createscript():  # 初始化delete和insert脚本
    table_name = []
    f = open('%s/allname.txt' % (base_dir))
    for l in f.readlines():
        if len(l) > 1:
            table_name.append(l)
    f.close()
    # os.system('/export/home/sybase_iq/OCS-15_0/bin/isql -Udba -Psql -Siq1857000 -Jutf8 -i /backup/script/1857000/%s >> /backup/logs/1857000/%s.log '%)
    count = 1
    if os.path.exists('%s/temp/' % base_dir):
        shutil.rmtree('%s/temp/' % base_dir)
    os.makedirs('%s/temp' % base_dir)
    for i in xrange(0, len(table_name), 100):  # 将delete和insert分组，每100张表一组
        b = table_name[i:i + 100]
        for i in b:
            f1 = open('%s/temp/temp_%s.sql' % (base_dir, count), 'a+')
            i = i.strip()
            if 'sys_' in i or 'SYS_' in i:
                sql = "print  '%s start copy'+convert(varchar(50),now()) \ngo\ndelete from %s where TJQ in (select C_BH_TJQ from T_DAT_TASK where DT_TJSJ >=convert(varchar(20),getdate(),110) and N_ZT=41)\ngo\ninsert into %s location 'iq227.db_sjfx' {select * from %s where TJQ in (select C_BH_TJQ from T_DAT_TASK where DT_TJSJ >=convert(varchar(20),getdate(),110) and N_ZT=41)}\ngo\nprint  '%s finished copy'+convert(varchar(50),now()) \ngo\n" % (
                i, i, i, i, i)
                f1.write(sql)

            elif '_JG' in i:
                sql = "print '%s start copy'+convert(varchar(50),now()) \ngo\ndelete from %s where C_BH_TJQ in (select C_BH_TJQ from T_DAT_TASK where DT_TJSJ >=convert(varchar(20),getdate(),110) and N_ZT=41)\ngo\ninsert into %s location 'iq227.db_sjfx' {select * from %s where C_BH_TJQ in (select C_BH_TJQ from T_DAT_TASK where DT_TJSJ >=convert(varchar(20),getdate(),110) and N_ZT=41)}\ngo\nprint  '%s finished copy'+convert(varchar(50),now()) \ngo\n" % (
                i, i, i, i, i)
                f1.write(sql)

            else:
                sql = "print '%s start copy'+convert(varchar(50),now()) \ngo\ntruncate table %s\ngo\ninsert into %s location 'iq227.db_sjfx' {select * from %s}\ngo\nprint  '%s finished copy'+convert(varchar(50),now()) \ngo\n" % (
                i, i, i, i, i)
                f1.write(sql)
            f1.close()
        count += 1


def execinsert():  # 调用isql执行delete和insert脚本
    info_ = os.walk('%s/temp' % base_dir)
    for i in info_:
        for l in i[2]:
            if '.sql' in l:
                l = l[0:-4]
                r = os.system(
                    '/export/home/sybase_iq/OCS-15_0/bin/isql -Udba -Psql -Siq1857000 -Jutf8 -i %s/temp/%s.sql > %s/logs/%s.log & ' % (
                    base_dir, l, base_dir, l))
                print r


if __name__ == '__main__':
    while 1:
        x = os.system(
            '/export/home/sybase_iq/OCS-15_0/bin/isql -Udba -Psql -Siq1857000 -Jutf8 -i %s/getstatus.sql > %s/status ' % (
            base_dir, base_dir))
        t = open('%s/status' % base_dir, 'r')
        com = re.compile(r"\s+\d+\s+$")
        zt = []
        for l in t.readlines():
            r = com.findall(l)
            if r:
                if r[0].strip() <> '41':
                    fil = open('%s/test' % base_dir, 'a+')
                    fil.write(r[0])
                    fil.close()
                    zt.append(r)
        t.close()
        if len(zt) == 0:
            break
        else:
            print 'searching'
        time.sleep(2)

        print 'inputing'
        createscript()
        execinsert():

    '''
    info_ = os.walk(base_dir)
    for i in info_:
        for l in i[2]:
            if '.sql' in l:
              f = open('%s\\%s'%(base_dir,l))
              for n in f.readlines():
                  if 'insert into' in n:
                      n1 = n.split()
                      f1 = open('%s\\allname.txt'%base_dir,'a+')
                      f1.write('%s\n'%n1[2])
                      f1.close()
              f.close()
    '''
