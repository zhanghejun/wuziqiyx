$(function(){
	kongbai={};
	for(var i=0;i<15;i++){
		$('<b>').addClass('hang').appendTo('.qipan');
		$('<i>').addClass('shu').appendTo('.qipan');
		for(var j=0;j<15;j++){
			kongbai[i+'-'+j]={x:i,y:j};
			$('<div>')
			.addClass('qizi')
            .attr('id',i+'-'+j)
            .data('pos',{x:i,y:j})
			.appendTo('.qipan')
		}
	}
   $('.tishi').addClass('y').text('请选择模式');  
	var flag=true;
	var hei={};
	var bai={};
	var isAi;

	$('.renji').on('click',function(){
		isAi=true;
		$(this).css({background:'#16A05D'})
		$('.renren').css({background:'#9DADA3'})
		$('.tishi').removeClass('y')
	})
    $('.renren').on('click',function(){
		isAi=false;
		$(this).css({background:'#16A05D'})
		$('.renji').css({background:'#9DADA3'})
		$('.tishi').removeClass('y')
		
	})
        
	$('.agmin').on('click',function(){
		location.reload();
	})

	var ai=function(){
	var zuobiao;
	var max=-Infinity;
	for(var i in kongbai){
		var weixie=panduan(kongbai[i],hei);
		if(weixie>max){
			max=weixie;
			zuobiao=kongbai[i]
		}
	}
	var zuobiao2;
	var max2=-Infinity;
	for(var i in kongbai){
		var weixie=panduan(kongbai[i],bai);
		if(weixie>max2){
			max2=weixie;
			zuobiao2=kongbai[i]
		}
	}
    return (max > max2)?zuobiao:zuobiao2;
}
	$('.qipan .qizi').on('click',function(){
		if($(this).hasClass('bai')||$(this).hasClass('hei')){
			return
		}
		var pos=$(this).data('pos');
		if(flag){
			$(this).addClass('hei');
			hei[pos.x+'-'+pos.y]=true;
			delete kongbai[join(pos.x,pos.y)];
			if(panduan(pos,hei) >=5){
				$('.tishi').addClass('y').text('黑棋胜利');
				isAi=false;
				$('.qipan .qizi').off('click');
			}
			if(isAi){
					var pos=ai();
					$('#'+join(pos.x,pos.y))
					.addClass('bai')
					.css({'backgrundColor':'red'})
					bai[join(pos.x,pos.y)]=true;
					delete kongbai[join(pos.x,pos.y)];
					if(panduan(pos,bai)>=5){
						$('.tishi').addClass('y').text('白棋胜利');
						$('.qipan .qizi').off('click');
					}
                        return
				}
			flag=false;
		}else{
			$(this).addClass('bai');
			bai[pos.x+'-'+pos.y]=true;
			if(panduan(pos,bai)>=5){
				$('.tishi').addClass('y').text('白棋胜利');
				$('.qipan .qizi').off('click')
			}
			flag=true
		}
	})

	var join=function(n1,n2){
		return n1+'-'+n2;
	}
	var panduan=function(pos,biao){
		var h=1,s=1,zx=1,yx=1;
		var tx, ty;
        tx=pos.x;ty=pos.y;
      while(biao[join(tx,ty-1)]){
         h++;
         ty--;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx,ty+1)]){
         h++;
         ty++;
      }
     tx=pos.x;ty=pos.y;
      while(biao[join(tx-1,ty)]){
         s++;
         tx--;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx+1,ty)]){
         s++;
         tx++;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx-1,ty+1)]){
       zx++;
       tx--;
       ty++;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx+1,ty-1)]){
       zx++;
       tx++;
       ty--;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx-1,ty-1)]){
       yx++;
       tx--;
       ty--;
      }
      tx=pos.x;ty=pos.y;
      while(biao[join(tx+1,ty+1)]){
       yx++;
       tx++;
       ty++;
      }
		return Math.max(h,s,zx,yx);


	}
})