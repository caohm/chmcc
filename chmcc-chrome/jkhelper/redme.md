#### jkhelper
#### mjdos使用方法
##### 开始统计：`jkHelper.startCalc();`
##### 查询：
```
jkHelper.getData("select max(cpuM),max(memM) from mjdos_4185 where date between ? and ? ",[ new Date(new Date().valueOf()-300000),new Date()])
```
##### 表名：`"mjdos_" + 分组ID`
##### 表结构:
> date  (Date)
> cpuM  (INTEGER) -- CPU最大值
> cpuA  (INTEGER) -- CPU平均值
> memM  (INTEGER)
> memA  (INTEGER)
> ioiM  (INTEGER)
> ioiA  (INTEGER)
> iooM  (INTEGER)
> iooA  (INTEGER)
> loadM (INTEGER)
> loadA (INTEGER)
> tcpM  (INTEGER)
> tcpA  (INTEGER)

##### 设置报警阀值：`jkHelper.setThreshold(80)`

#### ump监控
```
[
  {//第一页
    "title": "通 绿",//第一页title
  "param": {
  "address.export.service.AddressExportService.getAddressById": { "name": "getAddressById", "threshold": "2ms" },//第一页 第一iframe threshold为历史中间值
  "address.export.service.AddressExportService.getAddressList": { "name": "getAddressList", "threshold": "10ms" },//第一页 第二iframe threshold为历史中间值
  "address.export.service.AddressExportService.getAllDefaultAddress": { "name": "getAllDefaultAddress", "threshold": "10ms" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.getAddressById": { "name": "getAddressById", "threshold": "4ms" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.getAddressList": { "name": "getAddressList", "threshold": "20ms" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.getDefaultAddressResult": { "name": "getDefaultAddressResult", "threshold": "150ms(50ms)" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.reGetAddressById": { "name": "reGetAddressById", "threshold": "5000(500)" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.reGetAddressList": { "name": "reGetAddressList", "threshold": "500" },
  "soporder_sdk_count.r.AddressNewRPCImpl.phone.reGetDefaultAddressResult": { "name": "reGetDefaultAddressResult", "threshold": "3000(500)" }
    }
  }
]
```
#### risking监控配置
```
[
  {//第一页
    "title": "risking",//第一页title
    "param": [
      { "name": "order", "rftype": "99" },//第一页 第一iframe 99为全部订单（新）
      { "name": "order", "rftype": "20" },//第一页 第二iframe 20为手机订单
      { "name": "order", "rftype": "21" },
      { "name": "order", "rftype": "23" },
      { "name": "order", "rftype": "19" }
    ]
  }
]
```

#### mjdos
chrome-extension链接mjdos.html?appId=[deploy appId]&time=[时间 半小时：0.5，24小时：24.0]
eg：`chrome-extension://fibhfmjgepdgmnjcijeikhcjkfkfnmij/mjdos.html?appId=6276&time=0.5`
##### 运行
`start()`

