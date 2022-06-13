#!/bin/sh
gradle --version
gradle build --continuous &
gradle bootRun