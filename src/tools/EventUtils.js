export default class EventUtils {

    static preventEvent (event) {
        if (event) {
            event.preventDefault();
            event.stopImmediatePropagation && event.stopImmediatePropagation();
            event.stopPropagation();
        }
    }

}