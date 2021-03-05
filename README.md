## REVDEBUG APM TUTORIAL

Configure RevDeBug repository:

    npm config set @revdebug:registry https://nexus.revdebug.com/repository/npm/

Install dependancies (including RevDeBug):

    npm install

\* Note: Before instrumenting you may need to change the "host" (and maybe "port" / "webPort") fields in "revdebug.json" or specify different values on the command line if you are not running the record server locally.

Normal instrument:

    npx revd

Or instrument passing different host:

    npx revd --host your_record_server.com

Run the mysql server:

    docker-compose up -d

Run the express server:

    ./server.js &

And off we go...

    npm run dev

Enter queries to generate errors and APM traces.
