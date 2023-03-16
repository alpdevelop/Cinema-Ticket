const container = document.querySelector(".container");
const count = document.querySelector("#count")
const amount = document.querySelector("#amount")
const selectValue = document.querySelector("#movie")
const seats = document.querySelectorAll(".seat:not(.reserved)")

getFromLocalstrge();
calculateTotal();

container.addEventListener("click", function(e){
    if(e.target.classList.contains('seat') && !e.target.classList.contains('reserved')){ //just available seats selectable
        e.target.classList.toggle('selected');
        calculateTotal();

    }
});

selectValue.addEventListener('change' , function(e){
        calculateTotal();
});

function calculateTotal(){ //calc again for select every movies
        const selectedCountSeats = container.querySelectorAll(".seat.selected")

        const selectedSeatsArr = [...selectedCountSeats]; //use spread
        const seatsArr = [...seats];

        //---Long Way-------
        // selectedCountSeats.forEach(function(seat){ // Long way
        //     selectedSeatsArr.push(seat);
        // })

        // seats.forEach(function(seat){
        //     seatsArr.push(seat)
        // })
        //-----------------

        let selectedSeatIndexs =  selectedSeatsArr.map(function(seat){
            return seatsArr.indexOf(seat)
        });



        let selectedSeatCount = selectedCountSeats.length;
        count.textContent = selectedSeatCount
        amount.textContent = selectValue.value * selectedSeatCount

        saveToLocalStrge(selectedSeatIndexs);
}

function getFromLocalstrge(){
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if(selectedSeats != null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){ // array start 0
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    if(selectedMovieIndex != null) {
        selectValue.selectedIndex = selectedMovieIndex
    }
}

function saveToLocalStrge(indexs){
    localStorage.setItem('selectedSeats', JSON.stringify(indexs));
    localStorage.setItem('selectedMovieIndex', selectValue.selectedIndex);
}