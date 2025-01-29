{ pkgs }: {
  channel = "stable-24.05";
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.npm
    pkgs.openssl
    pkgs.docker
    pkgs.docker-compose
  ];
  services = {
    # mongodb = {
    #   enable = true;
    # };
    docker = {
      enable = true;
    };
  };
  idx = {
    extensions = [
      # Search for the extensions you want on https://open-vsx.org/ and use "publisher.id"
      "vscodevim.vim"
      "esbenp.prettier-vscode"
      "prisma.prisma"
      # "mongodb.mongodb-vscode"
    ];
    workspace = {
      # Runs when a workspace is first created
      onCreate = {
        # Example: install JS dependencies from NPM
        npm-install = "npm install";
      };
      # Runs when the workspace is (re)started
      onStart = {
        # Example: start a background task to watch and re-build backend code
        # watch-backend = "yarn server build && yarn server start:dev";
        # start-database = "mongod --port 27017 --fork --logpath ./.idx/database.log --dbpath ./.idx/.data";
        setup-env = "docker-compose -f ./docker-compose.yml up -d";
      };
    };
    previews = {
      previews = {
        web = {
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          manager = "web";
        };
      };
    };
  };
}
