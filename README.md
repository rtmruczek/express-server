# @bobbert/express-server

## Purpose

To give myself a starting point and stop bikeshedding whenever I have an idea for an app, but also allow for some level of configurability when it comes to things like DB and Auth strategies. Ideally you'd be able to switch between these strategies, but the strategies themselves would be somewhat opinionated.

## Now What?

Create multiple interchangeable and extensible strategies for `auth` and `db`. E.g. for `db`, you should be able to extend any out of the box data model interfaces. For `auth`, this may not be necessary.
