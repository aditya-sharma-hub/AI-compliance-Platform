require 'webrick'

server = WEBrick::HTTPServer.new(
  :Port => 8000,
  :DocumentRoot => File.expand_path(__dir__)
)

trap('INT') { server.shutdown }

puts "=================================================="
puts "  AegisAI Local Server Started Successfully!"
puts "  Access the application at: http://localhost:8000"
puts "  Press Ctrl+C to stop the server."
puts "=================================================="

server.start
