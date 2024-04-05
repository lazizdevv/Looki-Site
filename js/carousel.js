  const img = document.querySelectorAll(".cr");
  const sliders = document.querySelectorAll(".btm-sliders span");
  let indexValue = 1;

  function btmSlide(e) {
    showImg((indexValue = e));
  }

  function sideSlide(e) {
    showImg((indexValue += e));
  }

  function showImg(e) {
    if (e > img.length) {
      indexValue = 1;
    }

    if (e < 1) {
      indexValue = img.length;
    }

    for (let i = 0; i < img.length; i++) {
      img[i].style.display = "none";
    }

    for (let i = 0; i < sliders.length; i++) {
      sliders[i].style.background = "rgb(17, 17, 17)";
    }

    img[indexValue - 1].style.display = "block";

    sliders[indexValue - 1].style.background = "rgb(90, 90, 210)";
  }

  showImg(indexValue);

  setInterval(function () {
    sideSlide(1);
  }, 3000);
