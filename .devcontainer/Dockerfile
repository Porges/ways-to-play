FROM mcr.microsoft.com/devcontainers/rust:1-bookworm

# install NPM
RUN curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -

# ensure we're up to date and install pre-reqs
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get --assume-yes install --no-install-recommends \
# needed for image processing:
    exiftool \
# needed for mapshaper:
    nodejs \
# needed for fonttools:
    fonttools

# install powershell and other apt deps
RUN wget https://github.com/PowerShell/PowerShell/releases/download/v7.4.7/powershell_7.4.7-1.deb_amd64.deb \
    && dpkg -i powershell_7.4.7-1.deb_amd64.deb \
    && apt-get install --fix-broken \
    && rm powershell_7.4.7-1.deb_amd64.deb

# get cargo-binstall
RUN curl -L --proto '=https' --tlsv1.2 -sSf https://raw.githubusercontent.com/cargo-bins/cargo-binstall/main/install-from-binstall-release.sh | bash

RUN npm install -g mapshaper
