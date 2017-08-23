/**
 * Created by Administrator on 2017/8/22.
 */

$(function(){
    var page=1;
    var itemCount,pageSize,pageNo;
    // var num=$('#num').val();
    // var params=JSON.stringify({newsType:num});
    function getData(page){
        $.ajax({
            type: 'POST',
            url: 'detail.json',
            data: {pageNo:page,pageSize:6},//发送到服务器的数据
            dataType:'json',//预期服务器返回的数据类型
            // beforeSend:function(){
            //     $(".new-ul").append("<li class='loading'>loading...</li>");//显示加载动画
            // },
            success:function(data){
                itemCount = data.f; //总记录数
                pageSize = data.pageSize; //每页显示条数
                pageNo = page; //当前页
                console.log(data);
                var li = "";
                var list = data.list;
                $(".new-ul").empty();//清空数据区
                if(list.length==0){
                    li+='<li class="tem"><i></i><p>暂无数据信息</p></li>';
                    $(".new-ul").append(li);
                    $(".new-ul").css({'height':'350px'});
                    $(".news-center").css({'height':'350px'});
                }
                else{
                    $.each(list,function(index,params){
                        var id=list[index].id;//遍历json数据列
                        li+='<li><a href=" dynamic.html?id='+id +' "><img src='+ list[index].image+ '><h2>'+list[index].title+'</h2><p>'+list[index].newsHeadLine+'</p></a></li>'
                    });
                    $(".new-ul").append(li);
                }
            },
            complete:function(){
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
        var totalPage=Math.ceil(itemCount/pageSize);
        //页码大于最大页数
        if(page>totalPage) page=totalPage;
        //页码小于1
        if(page<1) page=1;
        pageStr = "<span>共"+itemCount+"条</span><span>"+page
            +"/"+totalPage+"</span>";

        //如果是第一页
        if(page==1){
            pageStr += "<span>首页</span><span>上一页</span>";
        }else{
            pageStr += "<span><a href='javascript:void(0)' rel='1'>首页</a></span> <span><a href='javascript:void(0)' rel='"+(page-1)+"'>上一页</a></span>";
        }

        //如果是最后页
        if(page>=totalPage){
            pageStr += "<span>下一页</span><span>尾页</span>";
        }else{
            pageStr += "<span><a href='javascript:void(0)' rel='"+(parseInt(page)+1)+"'>下一页</a></span><span><a href='javascript:void(0)' rel='"+totalPage+"'>尾页</a></span>";
        }

        $(".page-count").html(pageStr);

        $(".page-count span a").on('click',function(){
            var rel = $(this).attr("rel");
            page=rel;
            if(rel){
                getData(rel);
            }
        });
    }
    getData(1);

})