const btn = document.querySelector(".theme-chng");


if (localStorage.theme === undefined) {
    localStorage.setItem('theme', 'dark')
}

btn.addEventListener('click', () => {
    let theme = localStorage.theme

    if (theme === 'dark'){
        localStorage.setItem('theme', 'light')
        setTheme(theme)
        return;
    }

    if (theme === 'light'){
        localStorage.setItem('theme', 'dark')
        setTheme(theme)
        return;
    }
});

function setTheme(theme){
    let changeTo = localStorage.theme
    const elArray = document.querySelectorAll(`.${theme}`);

    elArray.forEach(element => {
        element.classList.remove(theme);
        element.classList.add(changeTo);
        btn.src = `static/images/svg/${changeTo}.svg`;
    });
}

setTheme('dark')