class Highlight < ApplicationRecord
  has_many :messages, dependent: :destroy
end
