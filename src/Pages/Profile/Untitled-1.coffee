<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>chai aur code</title>
</head>
<body style="background-color: #212121; color: white;">
    <ul class="language">
        <li>java</li>
    </ul>
</body>
<script>
    function addLanguage(langName){
       const li =  document.createElement('li')
       li.innerHTML = ${langName}
       document.querySelector('.language').appendChild(li)
    }
    addLanguage("python")
    addLanguage("typescript")

    function addOptiLang(langName){     
       const li =  document.createElement('li')
       li.appendChild(document.createTextNode (langName))
       document.querySelector('.language').appendChild(li)
    }
    addOptiLang('golang')

    //edit
    const secondlang = document.querySelector('li:nth-child(2)')
    secondlang.innerHTML= "jenish"

    const newli = document.createElement('li')
    newli.textContent = "mojo"
    secondlang.replaceWith(newli)
   

    //edit
    const firstlang = document.querySelector("li:first-child")
    firstlang.outerHTML = <li>TypeScript</li>

    //remove

    const lastlang = document.querySelector("li:last-child")
    lastlang.remove()


</script>
</html>