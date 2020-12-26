# Imagebuilder

Imagebuilder creates image from github repository which contains a Dockerfile and pushes it to the current user's Dockerhub repository.

## Requirements

- Dockerhub account
- Git repository url from which you want to create an image to Dockerhub

## Variables

#### Dockerhub credentials

ENV USERNAME

ENV PASSWORD

## Example run

Imagebuilder accepts username and password as a environmental variables but if not set, the imagebuilder will ask for them.

### without credentials

```bash
$ docker run -it --rm --name imagebuilder -v /var/run/docker.sock:/var/run/docker.sock imagebuilder
```

### with credentials

```bash
$ docker run -it --rm --name imagebuilder -e USERNAME=_exampleuser_ -e PASSWORD=_examplepassword_ -v /var/run/docker.sock:/var/run/docker.sock imagebuilder
```
