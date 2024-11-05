/*
    This is a class representing a EmployeeEvent Object.
    The EmployeeEvent Objects are currently not stored in a database and therefore hardcoded
*/
class EmployeeEvent {
    title: string; // the title of the event
    description: string; // the description of the event
    imageUrl: string; // the URL of the event's image
    link: string; // the URL of the event's detail page

    constructor(
        title: string,
        description: string,
        imageUrl: string,
        link: string,
    ) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
        this.link = link;
    }
}


document.addEventListener("DOMContentLoaded", function () {
    // get the events container, into which the following code will put the individual events
    const events_container: HTMLDivElement = document.getElementById("my_events") as HTMLDivElement;

    let employee_events: EmployeeEvent[] = []; // list of the events to be displayed
     
    // Hardcoded events that are currently not stored in a database
    employee_events.push(new EmployeeEvent(
        'Neon Party',
        'Come over and enjoy the atmosphere. Get to know some new colleagues and drink something.',
        '/Webpage/assets/demo/events/neon.png',
        'https://www.google.de',
    ));
    employee_events.push(new EmployeeEvent(
        'Win a helicopter tour',
        'Enter our monthly giveaway and win a helicopter tour over the company grounds.',
        '/Webpage/assets/demo/events/helicopter.png',
        'https://www.google.de',
    ));
    employee_events.push(new EmployeeEvent(
        'Chess tournament',
        'Come over and battle yourself with the other employees to prove that you are the best.',
        '/Webpage/assets/demo/events/chess.png',
        'https://www.google.de',
    ));
    employee_events.push(new EmployeeEvent(
        'Family day',
        'Bring your children over to work and show them around. Of course you can also bring your partners.',
        '/Webpage/assets/demo/events/family.png',
        'https://www.google.de',
    ));


    for (let event of employee_events) {
        // create the new element, used as a container for an individual object
        const event_element: HTMLDivElement = document.createElement('div');
        event_element.className = 'event_element';

        // generatre the image element
        const img_element: HTMLImageElement = document.createElement('img');
        img_element.className = 'event_image';
        img_element.src = event.imageUrl;
        event_element.appendChild(img_element); // append the image to the event element

        // generate the title element
        const title_element: HTMLHeadingElement = document.createElement('h4');
        title_element.textContent = event.title;
        event_element.appendChild(title_element); // append the title to the event element

        // generate the description element
        const description_element: HTMLParagraphElement = document.createElement('p');
        description_element.textContent = event.description;
        event_element.appendChild(description_element); // append the description to the event element

        // generate the more info button element
        const button_element: HTMLButtonElement = document.createElement('button');
        button_element.className = 'more_info_button';
        button_element.textContent = 'More infos';
        button_element.onclick = function () {
            window.open(event.link, '_blank')?.focus(); // open the link in a new tab
        }
        event_element.appendChild(button_element); // append the button to the event element

        events_container.appendChild(event_element); // append the event element to the events container
    }
});
