$(function () {

    init();

    /**
     * ��ʼ��ҳ��
     */
    function init(){
        if(localStorage.orderMonitor != undefined && localStorage.orderMonitor.length > 0){
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data = JSON.parse(localStorage.orderMonitor);
        }
        refresh();

        ////�����޸�
        //$("#saveBtn").click(function(){
        //    chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data = JSON.parse($("#content").html());
        //    refresh();
        //});
        //
        //����
        $("#resetBtn").click(function(){
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER_BAK.data);
            refresh();
        });
    }

    /**
     * ˢ��ҳ��
     */
    function refresh(){
        var monitorConfigArray = chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data;
        var html = '';
        for(var i = 0; i < monitorConfigArray.length; i++){
            html += '<tr>';
            html += '    <td>����</td>';
            html += '    <td>' + monitorConfigArray[i].title + '</td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td>״̬��</td>';
            html += '    <td>';
            html += '        <select class="switchSelect" id="switch_id_' + i + '">';
            html += '            <option value="off" ' + (monitorConfigArray[i].switch != 'on' ? 'selected' : '') + '>��</option>';
            html += '            <option value="on" ' + (monitorConfigArray[i].switch == 'on' ? 'selected' : '') + '>��</option>';
            html += '        </select>';
            html += '        <span class="suc-info">����ɹ�</span>';
            html += '    </td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td colspan="2"><img src="help.png" class="icon icon-question-sign">�Զ���ű�(ʧȥ����ʱ���Զ�����)<span class="suc-info" id="content_suc_msg_id_' + i + '">����ɹ�</span></td>';
            html += '</tr>';
            html += '<tr class="help-tr">';
            html += '    <td colspan="2">';
            html += '        <textarea>';
            html += '�����߼���������ԭʼ���ݽ���ɸѡ������������Ҫ���������ݷ��ر�����Ϣ���������豨�����ݷ��ؿմ���\n';
            html += '������\n';
            html += '\t@param title ��������\n';
            html += '\t@param todayData js���飬�������29���ӵ����ݣ���ǰ��1���Ӳ������棩��[0]�Ǿ��������������\n';
            html += '\t@param yesterdayData ���������\n';
            html += '\t@param thedaybeforeyesterdayData ǰ�������\n';
            html += '\t@returns {*} Ϊ������Ϊһ�����������ȴ���0���ַ�������ѷ���ֵΪ������Ϣ��\n';
            html += '        </textarea>';
            html += '    </td>';
            html += '</tr>';
            html += '<tr>';
            html += '    <td colspan="2">';
            //html += '        <div  id="contend_id_' + i + '" class="content" contenteditable="true">' + monitorConfigArray[i].monitorFunc + '</div>';
            html += '        <textarea  id="contend_id_' + i + '" class="content">' + monitorConfigArray[i].monitorFunc + '</textarea>';
            html += '    </td>';
            html += '</tr>';
        }
        $("table").html(html);

        //��ʽ������
        $(".content").each(function(){
            $(this).val(js_beautify($(this).text(), 4, ' '));
        })

        /**
         * ��ʾ/���ذ�����Ϣ
         */
        $(".icon-question-sign").click(function(){
            $(this).parent().parent().next().toggle(200);
        });

        /**
         * ����״̬�任
         */
        $(".switchSelect").change(function(){
            //alert(this.id);
            var index = Number($(this).attr("id").replace("switch_id_", ""));
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data[index].switch=$(this).val();
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data);
            refresh();
            $(".suc-info").hide();
            $("#switch_id_" + index).next().show(200);
        });

        /**
         * �ű����ݱ任
         */
        $(".content").change(function(){
            //alert(this.id);
            var index = Number($(this).attr("id").replace("contend_id_", ""));
            chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data[index].monitorFunc=$(this).val();
            localStorage.orderMonitor = JSON.stringify(chrome.extension.getBackgroundPage().MONITOR_CONFIG_ORDER.data);
            refresh();
            $(".suc-info").hide();
            $("#content_suc_msg_id_" + index).show(200);
        });
    }
});