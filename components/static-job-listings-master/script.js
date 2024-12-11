async function populate() {

    fetch('./data.json')
        .then((response) => response.json())
        .then((json) => populatePage(json));


}

function populatePage(obj) {
    // console.log(obj);
    const jobs = document.querySelector(".jobs_container")

    for (let i = 0; i < obj.length; i++) {
        const el = obj[i];
        console.log(el);
        const singleJob = document.createElement('div');
        singleJob.setAttribute('data-id', el.id)
        singleJob.classList.add('single_job')
        jobs.appendChild(singleJob);

        const jobLogo = document.createElement('div')
        jobLogo.classList.add('job_logo')
        singleJob.appendChild(jobLogo);

        // const


    }

}
populate()