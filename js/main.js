/**
 * Created by Administrator on 2017/8/22.
 */

$(function(){
    var page=1;
    var itemCount,pageSize,pageNo;
    function getData(page){
        $.ajax({
            type: 'POST',
            url: 'detail.json',
            // data: {pageNo:page,pageSize:6},//发送到服务器的数据
            dataType:'json',//预期服务器返回的数据类型
            success:function(data){
                console.log('111',[data,page]);
                itemCount = data.list.length; //总记录数
                pageSize = 6; //每页显示条数
                pageNo = page; //当前页

                var tr = "";
                var list = data.list;
                $("tbody").empty();//清空数据区
                console.log('2222',list);
                if(list.length==0){
                    tr+='<tr><td><input type="checkbox"></td><td>暂无数据</td></tr>';
                    $("tbody").append(tr);
                }
                else{
                    $.each(list,function(index,params){
                        var id=list[index].a;//遍历json数据列
                        tr+='<tr><td><input type="checkbox"></td><td>'+list[index].a+'</td><td>'+list[index].b+'</td><td>'+list[index].c+'</td><td>'+list[index].d+'</td><td>'+list[index].e+'</td><td>'+list[index].h+'</td><td>'+list[index].l+'</td><td>'+list[index].m+'</td><td>'+list[index].n+'</td><td>'+list[index].n+'</td><td>'+list[index].n+'</td><td><a href="javascript:;">编辑</a> <a href="javascript:;">删除</a></td></tr>';
                    });
                    $("tbody").append(tr);
                }
            },
            complete:function(){
                console.log('333',itemCount);
                if(itemCount!=0){
                    //生成分页条
                    getPageBar();
                }

            },
            error:function(){
                alert("数据加载失败");
            }
        });

    }

    function getPageBar(){
        console.log('44',[itemCount,pageSize]);
        console.log('55',page);
        var totalPage=Math.ceil(itemCount/pageSize);
        //页码大于最大页数
        if(page>totalPage) page=totalPage;
        //页码小于1
        if(page<1) page=1;
        pageStr='<span rel="1">首页</span><span rel="'+(parseInt(page)-1)+'">上一页</span>...<span rel="'+(parseInt(page)-1)+'">'+(parseInt(page)-1)+'</span><span class="current" rel="'+page+'">'+page+'</span><span rel="'+(parseInt(page)+1)+'">'+(parseInt(page)+1)+'</span>...<span rel="'+(parseInt(page)+1)+'" >下一页</span><span rel="'+totalPage+'">末页</span><span class="sum" rel="'+totalPage+'">共'+totalPage+'页/'+itemCount+'条数据</span><p>转到 <input value="1"> 页';

        //如果是第一页
        if(page==1) {
            console.log('1')
            pageStr = '<span class="disabled" rel="1">首页</span><span class="disabled">上一页</span><span class="current" rel="' + page + '">1</span><span rel="' + (parseInt(page) + 1) + '">' + (parseInt(page) + 1) + '</span><span rel="' + (parseInt(page) + 2) + '">' + (parseInt(page) + 2) + '</span>...<span rel="' + (parseInt(page) + 1) + '" >下一页</span><span rel="'+totalPage+'">末页</span><span class="sum">共' + totalPage + '页/' + itemCount + '条数据</span><p>转到 <input value="1" > 页';
        }
        // }else{
        //     console.log('2')
        //     pageStr='<span class="disabled" rel="1">首页</span><span rel="'+parseInt(page)-1+'">上一页</span><span class="current">'+page+'</span><span rel="'+parseInt(page)+1+'" name="3">下一页</span><span>末页</span><span class="sum">共'+totalPage+'页/'+itemCount+'条数据</span><p>转到 <input value="1"> 页';
        // }

        //如果是最后页
        if(page>=totalPage) {
            console.log('3')
            pageStr = '<span>首页</span><span rel="' + (parseInt(page) - 1) + '">上一页</span>...<span rel="' + (parseInt(page) - 2) + '">' + (parseInt(page) - 2) + '</span><span rel="' + (parseInt(page) - 1) + '">' + (parseInt(page) - 1) + '</span><span class="current" rel="' + page + '">' + page + '</span><span class="disabled">下一页</span><span class="disabled">末页</span><span class="sum">共' + totalPage + '页/' + itemCount + '条数据</span><p>转到 <input value="1"> 页';
        }
        // }else{
        //     console.log('LL'+'4')
        //     console.log(page);
        //     console.log(totalPage);
        //     pageStr='<span class="disabled">首页</span><span class="disabled">上一页</span><span class="current" rel="'+page+'">1</span><span rel="'+(parseInt(page)+1)+'">'+(parseInt(page)+1)+'</span><span rel="'+(parseInt(page)+2)+'">'+(parseInt(page)+2)+'</span>...<span rel="'+(parseInt(page)+1)+'" >下一页</span><span >末页</span><span class="sum">共'+totalPage+'页/'+itemCount+'条数据</span><p>转到 <input value="1"> 页';
        //
        // }

        $(".pages").html(pageStr);

        $(".pages span").on('click',function(){
            var rel = $(this).attr("rel");
            alert(rel);
            page=rel;
            if(rel){
                getData(rel);
            }
        });
    }
    getData(1);

})