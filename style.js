document.addEventListener('DOMContentLoaded', () =>{
    const trigger = document.getElementById('profile-Trigger');
    const dropdown = document.getElementById('profileDropdown');
    const elements = document.querySelectorAll('.cards');
    const locationButton = document.querySelector('#location, .location-btn');
    const locationLabel = document.querySelector('#selected-location') || locationButton?.querySelector('span:last-child');
    const savedLocation = localStorage.getItem('craigslist-location') || '';

    if(locationLabel && savedLocation){
        locationLabel.textContent = savedLocation;
    }

    locationButton?.addEventListener('click', () =>{
        const location = window.prompt('Enter a city, neighborhood, or ZIP code:', savedLocation)?.trim();
        if(location){
            localStorage.setItem('craigslist-location', location);
            if(locationLabel){
                locationLabel.textContent = location;
            }
        }
    });

    document.querySelectorAll('.category-tree > li').forEach(category =>{
        const arrow = category.querySelector(':scope > .arrow');
        const submenu = category.querySelector(':scope > .sub-category');
        if(!arrow || !submenu){
            return;
        }
        if(category.classList.contains('active')){
            category.classList.add('expanded');
        }
        arrow.setAttribute('role', 'button');
        arrow.setAttribute('tabindex', '0');
        arrow.setAttribute('aria-expanded', category.classList.contains('expanded'));
        const toggleCategory = () =>{
            category.classList.toggle('expanded');
            arrow.setAttribute('aria-expanded', category.classList.contains('expanded'));
            arrow.textContent = category.classList.contains('expanded') ? 'v' : '>';
        };
        arrow.addEventListener('click', toggleCategory);
        arrow.addEventListener('keydown', event =>{
            if(event.key === 'Enter' || event.key === ' '){
                event.preventDefault();
                toggleCategory();
            }
        });
    });

    if('IntersectionObserver' in window){
        const observer = new IntersectionObserver(entries =>{
            entries.forEach(entry =>{
                if(entry.isIntersecting){
                    entry.target.classList.add('visible');
                }else{
                    entry.target.classList.remove('visible');
                }
            });
        }, { threshold: 0.1 });
        elements.forEach(element => observer.observe(element));
    }else{
        elements.forEach(element => element.classList.add('visible'));
    }

    if(trigger && dropdown){
        trigger.addEventListener('click', event =>{
            event.stopPropagation();
            dropdown.classList.toggle('show');
        });
        window.addEventListener('click', event =>{
            if(!dropdown.contains(event.target) && event.target !== trigger){
                dropdown.classList.remove('show');
            }
        });
    }
});
