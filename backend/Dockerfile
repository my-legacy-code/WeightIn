FROM ruby:2.4.1
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /weignIn
WORKDIR /weignIn
ADD Gemfile /weignIn/Gemfile
ADD Gemfile.lock /weignIn/Gemfile.lock
RUN bundle install
ADD . /weignIn
EXPOSE 3000
CMD ["rails", "server", "-b", "0.0.0.0"]