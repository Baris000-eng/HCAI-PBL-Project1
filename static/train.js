function toggleSeed(checkbox) {
    const input = document.getElementById('seed_input');
    if (checkbox.checked) {
        input.disabled = true;
        input.style.opacity = "0.5";
        input.value = ""; 
    } else {
        input.disabled = false;
        input.style.opacity = "1";
        input.value = "42";
    }
}

document.querySelector('form').addEventListener('submit', function(e) {
    const evaluation_metrics = document.querySelectorAll('input[name="eval_metrics"]');
    const is_checked = Array.from(evaluation_metrics).some(cb => cb.checked);

    if (!is_checked) {
        e.preventDefault(); 
        alert("Please select at least one evaluation metric before training the model!");
    }
});