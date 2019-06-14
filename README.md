# KNP Trello History Power up

This power up allow you to browse the history of a card, to get the different
versions of its description through time !

## Two words on power ups

Power-Ups allow you to bring additional features to your boards and integrate
your favorite apps right into Trello. They can pull information and data from
outside services directly into Trello, giving you clear perspective on your
favorite tools for work.

## How to test

First thing, you need to be an administrator of a Trello Team, then head up for
[the trello Power up managment panel](https://trello.com/power-ups/admin). Here
you can see the different teams for which you can enable / disable or create new
power ups. Click on your team name, then click on create a Power-up button.

Give your power up a name and select at least the `card-back-section` capability in
the list.

Finally fill the iframe connector URL field with the adress where your power up
is hosted. We're using [glitch](https://knp-trello-extension.glitch.me/) to host
the developpment version of this power-up, but feel free to host it in another
service as long as it's served over HTTPS.

Once everything is done, go for the menu in one of your team's board, click on
the Power-Ups entry, your custom power up should show in the *Custom* section
of the list !

## More info

This project is built upon the Glitch Hosted Sample Trello Power-Up skeleton,
you may find the following links usefull to follow along.

Some usefull resources:
- [A power up tutorial](https://tech.trello.com/power-up-tutorial-part-one/)
- [The trello powerup skeleton repo](https://github.com/trello/glitch-trello-power-up)
- [Trello REST API client](https://developers.trello.com/reference/#rest-api-client)
