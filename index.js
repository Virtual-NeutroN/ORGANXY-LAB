//展开人员
document.addEventListener('DOMContentLoaded', function () {
    const toggleIcon = document.getElementById('toggle-icon');
    const membersContainer = document.getElementById('members-container');

    toggleIcon.addEventListener('click', function () {
        membersContainer.classList.toggle('expanded');
        toggleIcon.classList.toggle('expanded');
        if (membersContainer.classList.contains('expanded')) {
            toggleIcon.innerHTML = '&#x25B2;'; // 向上三角形
        } else {
            toggleIcon.innerHTML = '&#x25BC;'; // 向下三角形
        }
    });
});
