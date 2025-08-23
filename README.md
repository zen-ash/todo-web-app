# Simple To‑Do List

This repository contains a small to‑do list web application written in plain
HTML, CSS and JavaScript. I built it to scratch a personal itch: I wanted a
lightweight way to jot down tasks without spinning up a full framework or
reaching for a third‑party service. The result is a self‑contained page that
loads instantly and works in any modern browser.

## Features

The app supports all the basics you’d expect from a to‑do list:

* **Add tasks** – Type a description and click “Add” to append it to the list.
* **Edit tasks** – Click the “Edit” button to make a task’s text editable. When
  you’re done editing, click “Save” to commit your changes.
* **Mark complete** – Each task has a checkbox; completed tasks are styled
  with a strikethrough and a lighter background.
* **Delete tasks** – Remove unwanted items with a single click.
* **Persistent storage** – Your list is saved in your browser’s
  `localStorage`, so refreshing the page or closing the tab won’t wipe it
  away.

These features mirror common functionality described in tutorials for building
to‑do apps. For instance, guides on dev.to and GeeksforGeeks emphasise the
importance of adding, editing, deleting and marking tasks as complete, and
suggest using local storage to persist the data【458755074990480†L183-L193】【203605698872591†L90-L103】.

## How to run it

There are no dependencies or build steps. To try it out:

1. Clone this repository or download the files.
2. Open `index.html` in your favourite web browser.
3. Start adding tasks.

That’s it! Because the app uses `localStorage`, you’ll see your tasks again
if you revisit the page later from the same browser.

## Customisation

The CSS is intentionally simple and well‑commented. Feel free to adjust the
colour palette, spacing or typography to match your taste. You could also
extend the JavaScript to add due dates, categories or drag‑and‑drop
reordering. Since it’s all plain HTML, CSS and JS, there’s nothing to
compile – you can just open the file and start hacking away.

## A note on motivation

Building a to‑do list is a classic exercise for practicing DOM
manipulation and event handling. This version focuses on clean, readable
code and a polished user experience rather than cleverness. I hope you find
it as useful and enjoyable as I do.