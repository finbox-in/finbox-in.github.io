<script>
    setTimeout(() => {
        console.log("testttst", document.body.getElementsByClassName("navbar")[0], document.body.getElementsByClassName("sidebar")[0]);
        if (document.body.getElementsByClassName("navbar")[0]) document.body.getElementsByClassName("navbar")[0].style.display = "None";
        if (document.body.getElementsByClassName("sidebar")[0]) document.body.getElementsByClassName("sidebar")[0].style.display = "None";
    }, 200)
    
</script>
<div class="unauthorisedpage">
<h3>401</h3>
    Uh-oh! You are not authorised to view this page. Please contact our admin to get acesss.
</div>

