let gov,img,button,input;
document.addEventListener('DOMContentLoaded',(e)=>{
    let lib=document.querySelector('.lib');
    let con=document.querySelector('.con');
    let ndp=document.querySelector('.ndp');
    let gre=document.querySelector('.gre');
    let que=document.querySelector('.que');
    let input=document.querySelector('input');
    button=document.querySelector('button');
    img=document.querySelector('img');
    
    fetch('https://represent.opennorth.ca/representatives/house-of-commons/?offset=0&limit=200')
    .then(e=>e.json())
    .then(e=>display(e))
    .catch(error=>console.log(error));
    
    display=(gov)=>{
        Array.from(gov['objects']).forEach(guy=>{
            guy['gotAdvice']=false;

            let li = document.createElement('li');
            li.innerHTML=guy['name'];
            li.addEventListener('click',()=>{
                if(!guy['gotAdvice']){
                    fetch(`https://api.adviceslip.com/advice`)
                    .then(e=>e.json())
                    .then(e=>guy['advice']=e['slip']['advice'])
                    .catch(error=>console.log(error));
                }
                img.src=guy['photo_url'];
                img.id=guy['name'];
                if(guy['gotAdvice']===true){
                    input.value=guy['advice'];
                }else{
                    input.value='';
                };
            });
            
            switch (guy['party_name']) {
                case 'Liberal':
                    lib.appendChild(li);
                    break;
                case 'NDP':
                    ndp.appendChild(li);
                    break;
                case 'Conservative':
                    con.appendChild(li);
                    break;
                case 'Bloc Qu\u00e9b\u00e9cois':
                    que.appendChild(li);
                    break;
                case 'Green Party':
                    gre.appendChild(li);
                    break;
            }
        })
        button.addEventListener('click',(e)=>{
            e.preventDefault();
            Array.from(gov['objects']).forEach(guy=>{
                if(guy['name']===img.id){
                    current=guy;
                };
            })
            current['gotAdvice']=true;
            input.value=current['advice'];
            
        });
    };
});