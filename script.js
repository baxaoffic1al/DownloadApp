const uploadBox = document.querySelector('.upload-box');
const fileInput = uploadBox.querySelector('input');
const previewImg = uploadBox.querySelector('img');
const widhtInput = document.querySelector('.width input');
const heightInput = document.querySelector('.height input');
const ratioInput = document.querySelector('.ratio input');
const qualityInput = document.querySelector('.quality input');
const downloadBtn = document.querySelector('.download-btn');

let ogImageRatio;
 
const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    previewImg.src = URL.createObjectURL(file);
    previewImg.addEventListener('load' , () => {
        widhtInput.value = previewImg.naturalWidth;
        heightInput.value = previewImg.naturalHeight;
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight;
        document.querySelector('.wrapper').classList.add('active');
    });
}

widhtInput.addEventListener('keyup', () => {
    const height = ratioInput.checked ? widhtInput.value / ogImageRatio : heightInput.value;
    heightInput.value = Math.floor(height);
});

heightInput.addEventListener('keyup', () => {
    const width = ratioInput.checked ? heightInput.value * ogImageRatio : widhtInput.value;
    widhtInput.value = Math.floor(width);
});


const resizeAndDownload = () => {
    const canvas = document.createElement('canvas');
    const a = document.createElement('a');
    const ctx = canvas.getContext('2d');


    const imgQuality = qualityInput.checked ? 0.7 : 1.0;

    canvas.width = widhtInput.value;
    canvas.height = heightInput.value;


    ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);


    a.href = canvas.toDataURL("./image", imgQuality);
    a.download = new Date().getTime();
    a.click();
}



downloadBtn.addEventListener('click', resizeAndDownload);




fileInput.addEventListener('change', loadFile)
uploadBox.addEventListener('click' , () => fileInput.click());